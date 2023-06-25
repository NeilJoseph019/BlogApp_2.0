from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=300)
    post_image = models.ImageField(upload_to='post_Img', null=True, blank=True)

    def __str__(self):
        if len(self.description) > 50:
            return f"{self.description[:50]}..."
        return f"{self.description}"

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    comment_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_desc = models.TextField(max_length=200)

    def __str__(self):
        if len(self.comment_desc) > 50:
            return f"{self.comment_desc[:50]}..."
        return f"{self.comment_desc}"