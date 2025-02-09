<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Category Clicks Report</title>
</head>

<body>
    <h2>Daily Category Clicks Report</h2>
    <p>Hello,</p>
    <p>Here is today's report of category clicks:</p>

    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>Category</th>
                <th>Clicks</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($categories as $category)
                <tr>
                    <td>{{ $category->category }}</td>
                    <td>{{ $category->clicks }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p>Thank you for using our news portal.</p>
</body>

</html>
