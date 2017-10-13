import Url from 'url';

import { _ } from 'lodash';
import dig from 'node-dig-dns';

import whois from '../whois/whois';

/*

DNS:
  dig(['host', 'A', '+short'])
    -> A (hostIP)
    dig(['hostIP', '-x'])
      -> Get reverse hostname
    whois(hostIP)
      -> Get Server Provider
  dig(['domain', 'NS'])
    -> NS (nsName)
      dig(['@nsName', 'host', 'A'])
        -> Get authoritive DNS response time for host
      dig(['nsName', 'A', '+short'])
        -> NS (nsIP)
        whois(nsIP)
          -> Get DNS Provider

*/

export default async addr =>
  new Promise((resolve) => {
    const url = Url.parse(addr, true);
    // const protocol = (url.protocol === 'https:') ? 'https' : 'http';
    const host = url.host.split('.');
    const domain = `${host[host.length - 2]}.${host[host.length - 1]}`;

    const jobs1 = [
      dig([url.host, 'A']), // Get IP for Host
      dig([domain, 'NS']), // Get NS for Host
    ];

    Promise.all(jobs1)
      .then((nonAuthDNS) => {
        const aNRecord = _.find(_.get(nonAuthDNS[0], 'answer'), { type: 'A' });
        const aIP = _.get(aNRecord, 'value');
        const {
          time,
          server,
          size,
          datetime,
        } = nonAuthDNS[0];
        const nsNRecord = nonAuthDNS[1];
        const ns = nsNRecord.answer[0].value;

        const jobs2 = [
          dig(['-x', aIP]), // Get reverse hostname
          whois(aIP), // Get server provider
          dig([`@${ns}`, url.host, 'A']), // Get authoritive DNS response time for host
          dig([ns, 'A', '+short']), // Get IP of Nameserver
        ];

        Promise.all(jobs2)
          .then((dnsData) => {
            const reverseHostname = _.first(dnsData[0].answer) || {};
            const serverProvider = dnsData[1];
            const authDNSHost = dnsData[2];
            const nsIP = dnsData[3];

            const jobs3 = [
              whois(nsIP),
              dig(['-x', nsIP]),
            ];

            Promise.all(jobs3)
              .then((dnsData3) => {
                const nsProvider = dnsData3[0];
                const reverseNS = _.first(dnsData3[1].answer) || {};

                resolve({
                  ns: {
                    ip: nsIP,
                    name: ns,
                    reverse: reverseNS.value,
                    provider: nsProvider,
                  },
                  a: {
                    ip: aIP,
                    name: url.host,
                    reverse: reverseHostname.value,
                    provider: serverProvider,
                    benchmark: {
                      auth: [{
                        time: authDNSHost.time,
                        size: authDNSHost.size,
                        server: authDNSHost.server,
                        datetime: authDNSHost.datetime,
                      }],
                      nonAuth: [{
                        time,
                        server,
                        size,
                        datetime,
                      }],
                    },
                  },
                });
              })
              .catch(console.error);
          })
          .catch(console.error);
      })
      .catch(console.error);
  });
