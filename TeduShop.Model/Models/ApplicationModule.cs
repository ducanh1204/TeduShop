using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeduShop.Model.Models
{
    [Table("ApplicationModules")]
    public class ApplicationModule
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public int ParentID { get; set; }
    }
}