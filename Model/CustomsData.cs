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
        public string? OldCeirid { get; set; }
        public string? MaccsCEIRID { get; set; }
        public string? RONo { get; set; }
        public DateTime? RODate { get; set; }
        public decimal? CD { get; set; }
        public decimal? CT { get; set; }
        public decimal? AT { get; set; }
        public decimal? RF { get; set; }
        public DateTime? SentDatetime { get; set; }
        public string? Remark { get; set; }
        public string? EditBy { get; set; }
        public string? EditById { get; set; }
        public string? Status { get; set; }
    }
}
