namespace TeduShop.Data.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using TeduShop.Model.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<TeduShop.Data.TeduShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(TeduShop.Data.TeduShopDbContext context)
        {
            CreateProductCategorySample(context);

            //This method will be called after migrating to the latest version.

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new TeduShopDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new TeduShopDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "admin",
                Email = "anhnd@astec.vn",
                EmailConfirmed = true,
                Birthday = DateTime.Now,
                FullName = "Nguyễn Đức Anh"
            };

            manager.Create(user, "Ducanh12");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByEmail("tedu.international@gmail.com");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin", "User" });
        }

        private void CreateProductCategorySample(TeduShop.Data.TeduShopDbContext context)
        {
            if (context.ProductCategories.Count() == 0)
            {
                List<ProductCategory> productCategories = new List<ProductCategory>() {
                new ProductCategory()
                {
                    Name = "Điện lạnh",
                    Alias="dien-lanh",
                    Status=true
                },
                new ProductCategory()
                {
                    Name = "Viễn thông",
                    Alias="vien-thong",
                    Status=true
                }
                ,
                new ProductCategory()
                {
                    Name = "Đồ gia dụng",
                    Alias="do-gia-dung",
                    Status=true
                },new ProductCategory()
                {
                    Name = "Mỹ phẩm",
                    Alias="my-pham",
                    Status=true
                }
            };
                context.ProductCategories.AddRange(productCategories);
                context.SaveChanges();
            }
        }
    }
}