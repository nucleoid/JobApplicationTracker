using JobApplicationTracker.Models;
using JobApplicationTracker.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationRepository _repo;
        public ApplicationsController(IApplicationRepository repo) => _repo = repo;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetById(int id)
        {
            var app = await _repo.GetByIdAsync(id);
            return app == null ? NotFound() : Ok(app);
        }

        [HttpPost]
        public async Task<ActionResult<Application>> Create(Application app)
        {
            if (string.IsNullOrEmpty(app.CompanyName) || string.IsNullOrEmpty(app.Position))
                return BadRequest("Company Name and Position are required.");

            var created = await _repo.AddAsync(app);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Application updated)
        {
            var app = await _repo.GetByIdAsync(id);
            if (app == null) return NotFound();
            app.Status = updated.Status;

            if (!string.IsNullOrEmpty(updated.CompanyName) && !string.IsNullOrEmpty(updated.Position))
            {
                app.CompanyName = updated.CompanyName;
                app.Position = updated.Position;
            }

            await _repo.UpdateAsync(app);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var app = await _repo.GetByIdAsync(id);
            if (app == null) return NotFound();
            await _repo.DeleteAsync(app);
            return NoContent();
        }
    }
}
