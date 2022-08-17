SELECT b.id,
	b.title,
	b.page_count,
	b.read,
	b.description,
	a.id AS author_id
	a.first_name AS author_first_name,
	a.last_name AS author_last_name
	FROM Books as b
	LEFT JOIN Authors AS a ON b.author = a.id;