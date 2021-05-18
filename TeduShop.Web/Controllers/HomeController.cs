using System.Web.Mvc;

namespace TeduShop.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return RedirectToAction("Index", "Admin");
        }

        public ActionResult TestSiderBar()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}