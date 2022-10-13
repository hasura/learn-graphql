namespace HasuraDOTNetSample.Models;
public class Todo {
    public string Id { get; set; }

    public string Text { get; set; }

    public bool Done { get; set; }

    public User User { get; set; }
}