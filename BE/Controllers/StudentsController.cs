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
        public async Task<IActionResult> GetStudents(
            string search = "", int? age = null,
            int page = 1, int pageSize = 5,
            string sortBy = "Name", bool isAsc = true)
        {
            var query = _context.Students.AsQueryable();

            // Filtering
            if (!string.IsNullOrEmpty(search))
                query = query.Where(s => s.Name.Contains(search));

            if (age.HasValue)
                query = query.Where(s => s.Age == age);

            // Sorting
            switch (sortBy.ToLower())
            {
                case "age":
                    query = isAsc ? query.OrderBy(s => s.Age) : query.OrderByDescending(s => s.Age);
                    break;

                case "class":
                    query = isAsc ? query.OrderBy(s => s.Class) : query.OrderByDescending(s => s.Class);
                    break;

                default: // sort by Name
                    query = isAsc ? query.OrderBy(s => s.Name) : query.OrderByDescending(s => s.Name);
                    break;
            }

            // Pagination
            var totalCount = await query.CountAsync();
            var students = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Data = students
            });
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
