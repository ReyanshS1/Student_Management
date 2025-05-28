using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAPI.Models;

namespace StudentAPI.Controllers
{

       
        [Route("api/[controller]")]
        [ApiController]
        public class StudentsController : ControllerBase
        {
            private readonly StudentDbContext _context;
            public StudentsController(StudentDbContext context)
            {
                _context = context;
            }
            [HttpGet]
            public async Task<IActionResult> GetStudents()
            {
                return Ok(await _context.Students.ToListAsync());
            }
            [HttpPost]
            public async Task<IActionResult> AddStudent(Student student)
            {
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
                return Ok(student);
            }
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateStudent(int id, Student student)
            {
                var dbStudent = await _context.Students.FindAsync(id);
                if (dbStudent == null) return NotFound();
                dbStudent.Name = student.Name;
                dbStudent.Age = student.Age;
                dbStudent.Class = student.Class;
                await _context.SaveChangesAsync();
                return Ok(dbStudent);
            }
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteStudent(int id)
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null) return NotFound();
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

    
}
