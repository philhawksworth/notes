module.exports = (post) => `
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/css/styles.css">

  </head>
  <body>
    <div class="social-post">

      <ul class="meta-links">
        <li><a href="/note/${post.id}">Permalink</a></li>
        <li><a href="https://twitter.com/philhawksworth/status/${post.id}">Twitter</a></li>
      </ul>

      <a href="https://twitter.com/philhawksworth" class="avatar"><img src="" alt="A photo of Phil Hawksworth"></a>

      {% if post.in_reply_to_status_id %}
        Replying to <a href="https://twitter.com/${post.in_reply_to_screen_name}/status/${post.in_reply_to_status_id}">@${post.in_reply_to_screen_name}</a>
      {% endif %}
      <time datetime="${ post.created_at  }">${ post.created_at }</time>
      <div class="content">${ post.full_text }</div>
    </div>

  </body
</html>`;