

using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();


//Services.Addcontrollerswith views
builder.Services.AddMvc(opt =>opt.EnableEndpointRouting=false).AddXmlDataContractSerializerFormatters();


builder.Services.AddSingleton<IHttpContextAccessor,HttpContextAccessor>();
builder.Services.AddSession();

builder.Services.AddHttpClient("localhost:44433").ConfigurePrimaryHttpMessageHandler(_ => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }

});
///////////
///

//var handler = new HttpClientHandler();

//handler.ServerCertificateCustomValidationCallback +=
//                (sender, certificate, chain, errors) =>
//                {
//                    return true;
//                };

var app = builder.Build();



// Configure the HTTP request pipeline.

if (!app.Environment.IsDevelopment())
{
    
}



app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();

/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");*/


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

app.MapFallbackToFile("index.html"); ;

app.Run();
