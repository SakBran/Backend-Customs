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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string? ediPath { get; set; }
        public string? CEIRID { get; set; } 
        public string? RONo { get; set; } // RO-No
        public string? RODate { get; set; } // RO-Date
        public string? CD { get; set; } // CD
        public string? CT { get; set; } // CT
        public string? AT { get; set; } // AT
        public string? RF { get; set; } // RF
    }

}