using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Student>> Get()
        {
            // קריאת הנתונים מקובץ JSON
            var studentsJson = System.IO.File.ReadAllText("Data/students.json");
            var students = JsonConvert.DeserializeObject<List<Student>>(studentsJson);
            return Ok(students);
        }
    }
}
