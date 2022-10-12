using Angular_Ecom.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Angular_Ecom.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


       


        private readonly IConfiguration _configuration;
        private readonly AuthService _authService;

        private static IHttpContextAccessor _hca { get; set; }
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ILogger<HomeController> _logger;

        public HomeController(IConfiguration configuration,
            IWebHostEnvironment webHostEnvironment, IHttpContextAccessor x,
            ILogger<HomeController> logger)
        {
            _hca = x;
            _configuration = configuration;
            _authService = new AuthService(_hca, webHostEnvironment);
            _authService.baseAddress = _configuration.GetSection("AppSettings").GetSection("baseAddress").Value;

            _logger = logger;
        }




        [HttpGet]
        [Route("fetchdata")]
        public string fetchdata()
        {
            return "HC RV";

        }


        [Route("createuser")]
        [HttpPost]

        public async Task<bool> createuser([FromBody] Customer c)
        {
            bool status = await _authService.RegisterUserAsync(c);
            return status;
        }

        [Route("LoginUser")]
        [HttpPost]
        public async Task<string> LoginUser([FromBody] Angular_Ecom.Models.Customer u)
        {
            string[] rVal = await _authService.LoginAsync(u.UserName, u.Password);
            if (rVal != null)
            {
                HttpContext.Session.SetString("UserName", u.UserName);
                HttpContext.Session.SetString("AccessToken", rVal[0]);
                HttpContext.Session.SetString("AccessTokenExpirationDate", rVal[1]);
                  return JsonConvert.SerializeObject(rVal);
            }
            else
            {
                return null;
            }
        }
    }
}
