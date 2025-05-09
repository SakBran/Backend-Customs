using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Model
{

    public class SystemSetting
    {
        public SystemSetting()
        {
            this.Id = Guid.NewGuid().ToString();
            this.sourceFolder = string.Empty;
            this.completeFolder = string.Empty;
            this.toReadFileName = string.Empty;
            this.toReadFileNameStartWith = string.Empty;
            this.CEIRID = string.Empty;
            this.RONo = string.Empty;
            this.RODate = string.Empty;
            this.CD = string.Empty;
            this.CT = string.Empty;
            this.AT = string.Empty;
            this.RF = string.Empty;

        }
        [Key]
        public string Id { get; set; }
        //public string? ediPath { get; set; }
        public string sourceFolder { get; set; }
        public string completeFolder { get; set; }
        //MR00*
        public string toReadFileName { get; set; }
        public string toReadFileNameStartWith { get; set; }
        public string CEIRID { get; set; }
        public string RONo { get; set; } // RO-No
        public string RODate { get; set; } // RO-Date
        public string CD { get; set; } // CD
        public string CT { get; set; } // CT
        public string AT { get; set; } // AT
        public string RF { get; set; } // RF
        public string AuthorizationTokenURL_CEIR { get; set; } = string.Empty;
        public string PaymentConfirmationURL_CEIR { get; set; } = string.Empty;
        public string principal { get; set; } = string.Empty;
        public string credentials { get; set; } = string.Empty;

    }

}