


using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Security;
using System.Text;

namespace Angular_Ecom.Models
{
    public class AuthService
    {

        //public string baseAddress;
        private readonly IHttpContextAccessor _contextAccessor;

        public string baseAddress { get; set; }

        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _hca;


        public AuthService(IHttpContextAccessor h, IWebHostEnvironment e)
        {
            _webHostEnvironment = e;
            _hca = h;

        }

        public async Task<bool> RegisterUserAsync(
            Customer e)
        {
            //---  var client = new HttpClient();
            //string s = HttpContext.Session.GetString("cccc");
            var model = new Customer

            {
                UserName = e.UserName,
                Email = e.Email,
                Phone=e.Phone,
                Password = e.Password
               // appcode = "BaseAddress",
                /* RoleId = 1,//e.RoleId,
                 IsActive = true,//e.IsActive,
                 CreatedBy = "SECP_OMS-ADMIN"//_httpContextAccessor.HttpContext.Session.GetString("UserName")*/

                // ConfirmPassword = confirmPassword
            };

            ///////////////////////////////////////
            //var handler = new HttpClientHandler();

            //handler.ServerCertificateCustomValidationCallback +=
            //                (sender, certificate, chain, errors) =>
            //                {
            //                    return true;
            //                };


            // HttpClientHandler clientHandler = new HttpClientHandler();
            //clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };


            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback += (sender, certificate, chain, errors) =>
            {
                // local dev, just approve all certs
                return true;
               // return errors == SslPolicyErrors.None;
            };
            ///////////////////////////////////////////////

            //****************---------************************
            using (HttpClient client = new HttpClient(clientHandler))
            {

                client.BaseAddress = new Uri(baseAddress);     //APIGateway_BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                string serializedObject = JsonConvert.SerializeObject(model);
                HttpContent contentPost = new StringContent(serializedObject, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("JWT-MS/api/auth/register", contentPost);
                //****************************************** 

                if (response.IsSuccessStatusCode)
                {
                    //
                    
                    //

                    return true;
                }
            }
            return false;
        }

        internal Task<string[]> LoginAsync(object UserName, object Password)
        {
            throw new NotImplementedException();
        }

        public async Task<string[]> LoginAsync(string UserName, string Password)
        {

            try
            {
                HttpClient client = new HttpClient();
               var model = new Customer
                {
                   UserName = UserName,
                   Password = Password,

                    appcode = "registerConn"
                };



               client.BaseAddress = new Uri(baseAddress);
               client.DefaultRequestHeaders.Accept.Clear();
               string serializedObject = JsonConvert.SerializeObject(model);
                HttpContent contentPost = new StringContent(serializedObject, Encoding.UTF8, "application/json");
               var response = await client.PostAsync("JWT-MS/api/auth/login", contentPost);

             //***************************************888

               // var response = await client.SendAsync(request);
              if (response.IsSuccessStatusCode)
            {

                  var content = await response.Content.ReadAsStringAsync();
                  var handler = new JwtSecurityTokenHandler();

                    
                    JToken jwtDynamic = JsonConvert.DeserializeObject<dynamic>(content);
                  

                  String[] accessToken = new String[] { "", ""};
                  accessToken[0] = jwtDynamic.Value<string>("auth_token");



                    var token = handler.ReadJwtToken(accessToken[0]);


                   

                    var accessTokenExpiration = TimeZoneInfo.ConvertTimeFromUtc(token.ValidTo, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                    accessToken[1] = accessTokenExpiration.ToString();
                    _hca.HttpContext.Session.SetString("AccessTokenExpirationDate", accessTokenExpiration.ToString());

             


                    return accessToken;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {

            }
        }
    }
            }