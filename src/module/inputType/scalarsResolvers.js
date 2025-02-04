import {Long} from '../../utils/scalars.js'

const scalarsResolvers = {
    Long, // Globally register Long scalar
    Query: {
        payRunLastCalculatedTimestamps: async (_, {payRunIds}) => {
            return payRunIds.map(id => ({
                payRunId: id,
                lastCalculatedTimestamp: new Date().toISOString()
            }));
        }
    }
};





export {scalarsResolvers}
