using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;


[Route("api/favorites")]
[ApiController]
public class FavoritesController : ControllerBase
{
    private const string FilePath = "favorites.json";

    [HttpPost]
    public async Task<IActionResult> SaveFavorite([FromBody] NewsArticle favoriteArticle)
    {
        if (favoriteArticle == null)
            return BadRequest("Invalid article data");

        List<NewsArticle> favorites = new List<NewsArticle>();

        if (System.IO.File.Exists(FilePath))
        {
            string existingData = await System.IO.File.ReadAllTextAsync(FilePath);
            favorites = JsonSerializer.Deserialize<List<NewsArticle>>(existingData) ?? new List<NewsArticle>();
        }

        favorites.Add(favoriteArticle);
        string jsonData = JsonSerializer.Serialize(favorites, new JsonSerializerOptions { WriteIndented = true });
        await System.IO.File.WriteAllTextAsync(FilePath, jsonData);

        return Ok(new { message = "Saved to favorites!" });
    }
    [HttpDelete]
    public async Task<IActionResult> RemoveFavorite([FromBody] NewsArticle favoriteArticle)
    {
        if (favoriteArticle == null)
        {
            Console.WriteLine("Invalid article data");
            return BadRequest("Invalid article data");
        }

        if (!System.IO.File.Exists(FilePath))
        {
            Console.WriteLine("Favorites not found");
            return NotFound("Favorites not found");
        }

        string existingData = await System.IO.File.ReadAllTextAsync(FilePath);
        List<NewsArticle> favorites = JsonSerializer.Deserialize<List<NewsArticle>>(existingData) ?? new List<NewsArticle>();

        var articleToRemove = favorites.FirstOrDefault(a => a.Title == favoriteArticle.Title && a.Url == favoriteArticle.Url);
        if (articleToRemove != null)
        {
            favorites.Remove(articleToRemove);
            string jsonData = JsonSerializer.Serialize(favorites, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(FilePath, jsonData);
            Console.WriteLine("Article removed from favorites");
            return Ok(new { message = "Removed from favorites!" });
        }

        Console.WriteLine("Article not found in favorites");
        return NotFound("Article not found in favorites");
    }


    [HttpGet]
    public async Task<IActionResult> GetFavorites()
    {
        if (!System.IO.File.Exists(FilePath))
            return Ok(new List<NewsArticle>());

        string jsonData = await System.IO.File.ReadAllTextAsync(FilePath);
        var favorites = JsonSerializer.Deserialize<List<NewsArticle>>(jsonData);
        return Ok(favorites);
    }
}


