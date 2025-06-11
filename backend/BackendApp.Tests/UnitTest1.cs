namespace BackendApp.Tests;

public class UnitTest1
{
    [Fact] // Marks this method as a test
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange - setup any needed variables
        int a = 5;
        int b = 7;

        // Act - perform the action you want to test
        int result = Add(a, b);

        // Assert - verify the result is what you expect
        Assert.Equal(12, result);
    }

    // Simple method under test
    private int Add(int x, int y)
    {
        return x + y;
    }
}