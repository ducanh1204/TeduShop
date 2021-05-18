using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;

namespace TeduShop.Model.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base()
        {

        }

        [StringLength(250)]
        public string Description{ set;get; }

        public static implicit operator ApplicationRole(string v)
        {
            throw new NotImplementedException();
        }
    }
}