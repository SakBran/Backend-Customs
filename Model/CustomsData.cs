using System;
using System.ComponentModel.DataAnnotations;

namespace BackendCustoms.Model
{
    public class CustomsData
    {
        public CustomsData()
        {
            this.id = Guid.NewGuid().ToString();
        }
        [Key]
        public string id { get; set; }

        public DateTime? ReceivedDatetime { get; set; }
        public string? CEIRID { get; set; }
        public string? MACCSCEIRID { get; set; }
        public string? RONo { get; set; }
        public DateTime? RODate { get; set; }
        public string? CD { get; set; }
        public string? CT { get; set; }
        public string? AT { get; set; }
        public string? RF { get; set; }
        public DateTime? SentDatetime { get; set; }
        public string? Remark { get; set; }
        public string? EditBy { get; set; }
    }
}
