import { Server } from './serverSchema';
import pkgSettings from '../../../../package.json';

export default {
  getServerInfo: {
    type: Server,
    description: 'Get info of GraphQL Server',
    args: {},
    resolve() {
      const { version } = pkgSettings;
      return {
        version,
      };
    },
  },
};
