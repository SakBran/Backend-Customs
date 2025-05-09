using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.MACCS.Request
{
    public class PaymentConfirmationRequest
    {

        public required string ceirId { get; set; }


        public required string releaseOrderNumber { get; set; }


        public DateTime dateTime { get; set; }


        public double Sum_CT { get; set; } // Commercial Tax


        public double Sum_CD { get; set; } // Customs Duty


        public double Sum_AIT { get; set; } // Advanced Income Tax


        public double Sum_RF { get; set; } // Penalties
    }
}