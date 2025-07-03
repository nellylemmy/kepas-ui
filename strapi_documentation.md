
# Strapi Content Management Guide

This guide provides a step-by-step walkthrough for managing your website's content using the Strapi Headless CMS. You'll learn how to view existing data, create new content types, and connect them to your frontend UI.

---

## 1. Accessing the Strapi Admin Panel

Your Strapi backend is running in a Docker container. To access the admin panel, your application stack must be running (`docker-compose up -d`).

- **URL**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **Login**: Use the administrator credentials you created during the initial setup.

If you haven't created an admin user yet, the first time you visit the URL, Strapi will prompt you to create one.

---

## 2. How to View and Manage Existing Data

Once logged in, you will see the Strapi dashboard. All your content is managed through the **Content Manager**.

1.  **Navigate to Content Manager**: Click on `Content Manager` in the left-hand sidebar.
2.  **Select a Collection Type**: You will see a list of your existing "Collection Types" (e.g., `Testimonials`, `Form Submissions`). Click on the one you want to view or edit.
3.  **View and Edit Entries**: You can now see all entries for that collection. Click on any entry to view its details, make changes, or delete it.

---

## 3. How to Add New Fields or Create New Collections

Strapi's **Content-Type Builder** allows you to define the structure of your data.

### A. Adding a New Field to an Existing Collection

Let's say you want to add a `company` field to your `Testimonials`:

1.  **Navigate to Content-Type Builder**: In the main sidebar, go to `Plugins` > `Content-Type Builder`.
2.  **Select the Collection**: Under `Collection Types`, find and click on `Testimonial`.
3.  **Add a New Field**: Click on `+ Add another field`.
4.  **Choose a Field Type**: Select the type of field you want to add (e.g., `Text` for a company name).
5.  **Configure the Field**: Give the field a name (e.g., `company`) and click `Finish`.
6.  **Save**: A green `Save` button will appear in the top right. Click it to save your changes. Strapi will automatically restart to apply the new schema.

### B. Creating a New Collection from Scratch

1.  **Open Content-Type Builder**: Go to `Plugins` > `Content-Type Builder`.
2.  **Create New Collection**: Under `Collection Types`, click `+ Create new collection type`.
3.  **Configure the Collection**: 
    - **Display Name**: Enter a name, e.g., `Blog Post`.
    - **API ID (Plural)**: This will be auto-generated (e.g., `blog-posts`). This is what you'll use in your API calls.
    - Click `Continue`.
4.  **Add Fields**: Just like before, add all the fields you need (e.g., `title` (Text), `content` (Rich Text), `author` (Text)).
5.  **Save**: Click the `Save` button to create the new collection.

---

## 4. Creating the 'Testimonials' Collection

The `Testimonials` collection should include fields for a profile image, name, company, and quote.

1.  **Go to Content-Type Builder**: In the left menu, click `Plugins` -> `Content-Type Builder`.
2.  **Select Testimonial**: If you already have a `Testimonial` collection, click on it to edit. Otherwise, create a new one.
3.  **Configure Fields**: Ensure you have the following fields. You can edit existing ones (using the pencil icon) or add new ones.
    *   `name` (Type: Text, Short text)
    *   `company` (Type: Text, Short text)
    *   `quote` (Type: Text, Long text)
    *   `profile_image` (Type: Media, Single media)
4.  **Save Your Collection**: Click the green `Save` button. Strapi will restart to apply the changes.

---

## 5. Adding Content and Setting Permissions

### A. Add a Testimonial

1.  **Go to Content Manager**: In the left menu, click on `Testimonials`.
2.  **Add New Entry**: Click `+ Add New Testimonials`.
3.  **Fill in the fields**: Add a name, company, quote, and upload a profile image.
4.  **Save and Publish**: Click `Save`, then click `Publish`.

### B. Set Public Permissions

Ensure the `Testimonial` collection and its media are publicly accessible.

1.  **Go to Settings**: In the left menu, click `Settings` -> `Roles` (under Users & Permissions Plugin) -> `Public`.
2.  **Grant Permissions**:
    *   Find `Testimonial` and check the boxes for `find` and `findOne`.
    *   Find `Upload` and check the box for `find`. This allows the public to view uploaded files.
3.  **Save** your changes.

---

## 6. Connecting Strapi to Your UI

Now you can fetch the testimonials on a dedicated page. The API endpoint is `http://localhost:1337/testimonials`.

**Example Code for `testimonials.html`**

```html
<div id="testimonials-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Testimonials will be loaded here -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:1337/testimonials';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('testimonials-container');
            container.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(testimonial => {
                    const imageUrl = testimonial.profile_image ? `http://localhost:1337${testimonial.profile_image.url}` : 'https://via.placeholder.com/150';
                    const card = `
                        <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <img src="${imageUrl}" alt="${testimonial.name}'s profile picture" class="w-24 h-24 rounded-full object-cover mb-4">
                            <p class="text-slate-600 italic flex-grow">"${testimonial.quote}"</p>
                            <div class="mt-4">
                                <p class="font-bold text-lg">${testimonial.name}</p>
                                <p class="text-sm text-gray-500">${testimonial.company}</p>
                            </div>
                        </div>
                    `;
                    container.innerHTML += card;
                });
            } else {
                container.innerHTML = '<p>No testimonials found.</p>';
            }
        })
        .catch(error => console.error('Error fetching testimonials:', error));
});
</script>
```
