using GameStore.Api.Dtos;

namespace GameStore.Api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";
    private static readonly List<GameDto> games = [
        new (
            1, 
            "Street fighter II", 
            "Fighting", 
            19.99M, 
            new DateOnly(1922,7,15)),
        new (2, "Super Mario World", "Platformer", 49.99M, new DateOnly(1990, 11, 21)),
        new (3, "Doom", "Shooter", 19.99M, new DateOnly(1993, 12, 10)),
        new (4, "StarCraft", "RTS", 14.99M, new DateOnly(1998, 3, 31)),
        new (5, "Portal", "Puzzle", 9.99M, new DateOnly(2007, 10, 10)),
        new (6, "The Witcher 3: Wild Hunt", "RPG", 39.99M, new DateOnly(2015, 5, 19)),
        new (7, "Hades", "Roguelike", 24.99M, new DateOnly(2020, 9, 17))
    ];

    public static void MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");

        // GET /games
        group.MapGet("/", () => games);

        // GET /games/1
        group.MapGet("/{id}", (int id) =>
        {
            var game = games.Find(game => game.Id == id);

            return game == null ? Results.NotFound() : Results.Ok(game); 
        })
            .WithName(GetGameEndpointName);

        // POST /games

        group.MapPost("/", (CreateGameDto newGame) =>
        {
            GameDto game = new(
                games.Count + 1,
                newGame.Name,
                newGame.Genre,
                newGame.Price,
                newGame.ReleaseDate
            );

            games.Add(game);

            return Results.CreatedAtRoute(GetGameEndpointName, new{id = game.Id}, game);
        });


        // PUT /games/1

        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame) =>
        {
            var index = games.FindIndex(game => game.Id == id);

            if (index == -1)
            {
                return Results.NotFound();
            }

            games[index] = new GameDto(
                id,
                updatedGame.Name,
                updatedGame.Genre,
                updatedGame.Price,
                updatedGame.ReleaseDate
            );

            return Results.NoContent();
        });

        // DELETE /games/1

        group.MapDelete("/{id}", (int id) =>
        {
            games.RemoveAll(game => game.Id == id);

            return Results.NoContent();
        });
    }
}