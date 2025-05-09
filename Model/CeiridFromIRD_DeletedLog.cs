using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Model
{
    public class CeiridFromIRD_DeletedLog
    {
        public CeiridFromIRD_DeletedLog()
        {
            this.id = Guid.NewGuid().ToString();
            this.CEIRID = string.Empty; // Initialize with a default value
        }
        public string id { get; set; }
        public string CEIRID { get; set; }
        public DateTime ReceivedDatetime { get; set; }
        public bool IsSent { get; set; }
        public DateTime? SendDatetime { get; set; }
        public DateTime? DeletedDateTime { get; set; }
    }
}