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
            CreateModulesSample(context);

            //This method will be called after migrating to the latest version.

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new TeduShopDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new TeduShopDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "admin",
                Email = "anhnd1204.work@gmail.com",
                EmailConfirmed = true,
                Birthday = DateTime.Now,
                FullName = "Nguyễn Đức Anh"
            };

            manager.Create(user, "123456");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByEmail("anhnd1204.work@gmail.com");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin", "User" });
        }

        private void CreateModulesSample(TeduShop.Data.TeduShopDbContext context)
        {
            if (context.ProductCategories.Count() == 0)
            {
                List<ApplicationModule> applicationModules = new List<ApplicationModule>() {
                new ApplicationModule()
                {
                    ID = 1,
                    Name="Quản lý",
                    URL=null,
                    ParentID = 0,
                },
                new ApplicationModule()
                {
                    ID = 2,
                    Name="Hệ thống",
                    URL=null,
                    ParentID = 0,
                },
                new ApplicationModule()
                {
                    ID = 3,
                    Name="Sản phẩm",
                    URL=null,
                    ParentID = 1,
                },
                new ApplicationModule()
                {
                    ID = 4,
                    Name="Thể loại sản phẩm",
                    URL="product_categories",
                    ParentID = 3,
                },
                new ApplicationModule()
                {
                    ID = 5,
                    Name="Sản phẩm",
                    URL="products",
                    ParentID = 3,
                },
                new ApplicationModule()
                {
                    ID = 6,
                    Name="Người dùng",
                    URL=null,
                    ParentID = 2,
                },
                new ApplicationModule()
                {
                    ID = 7,
                    Name="Quyền",
                    URL="application_roles",
                    ParentID = 6,
                },
                new ApplicationModule()
                {
                    ID = 8,
                    Name="Nhóm người dùng",
                    URL="application_groups",
                    ParentID = 6,
                },
                new ApplicationModule()
                {
                    ID = 9,
                    Name="Người dùng",
                    URL="application_users",
                    ParentID = 6,
                }
            };
                context.ApplicationModules.AddRange(applicationModules);
                context.SaveChanges();
            }
        }
    }
}