using System;
using System.ComponentModel.DataAnnotations;

namespace TeduShop.Model.Abtract
{
    public abstract class Auditable : IAuditable
    {
        [MaxLength(256)]
        public string MetaKeyword { set; get; }

        [MaxLength(256)]
        public string MetaDescription { set; get; }

        public DateTime? CreatedDate { set; get; }

        [MaxLength(256)]
        public string CreatedBy { set; get; }

        public DateTime? UpdateDate { set; get; }

        [MaxLength(256)]
        public string UpdateBy { set; get; }

        public bool Status { get; set; }
    }
}