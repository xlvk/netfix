# NetFix

## Description
This Django project allows users to request various services such as fixing bidets, painting walls, and home cleaning.

## Installation Instructions

### Ubuntu Users
If you encounter the "externally-managed-environment" error on Ubuntu, follow these steps to set up a virtual environment:

1. Navigate to your project directory in the terminal.
2. Install the `python3-venv` package:
    ```
    sudo apt update
    sudo apt install python3-venv
    ```
3. Create a virtual environment:
    ```
    python3 -m venv myenv
    ```
   Replace `myenv` with the desired name for your virtual environment.
4. Activate the virtual environment:
    ```
    source myenv/bin/activate
    ```
5. Install Django version 3.1.14:
    ```
    pip install django==3.1.14
    ```

### Starting the Server

Once you've set up the virtual environment (if needed), you can start the Django development server:

1. Navigate to the project directory containing `manage.py` in the terminal.
2. Activate the virtual environment (if using one).
3. Run the following command:
    ```
    python manage.py runserver
    ```

The development server should start, and you should see output indicating that the server is running.

### Testing the Project

To test the Django project:

1. Open a web browser.
2. Navigate to `http://127.0.0.1:8000/` or `http://localhost:8000/`.
3. You should see the homepage of the Django project.
4. Test various features of the website, such as requesting services and navigating through different pages.

### Generating File Tree Structure (for Mohamed use with AI)

To generate a file tree structure excluding the `myenv` folder:

1. Navigate to the project directory in the terminal.
2. Run the following command:
    ```
    tree -I 'myenv' > file.txt
    ```

## Additional Information

- **Project Structure**: The project follows a typical Django structure with separate apps for different functionalities (e.g., `main`, `services`, `users`).
- **Static Files and Templates**: Static files (CSS, JavaScript, images) are stored in the `static` directory, and HTML templates are stored in the `templates` directory within each app.
- **Admin Panel**: Access the Django admin panel at `http://127.0.0.1:8000/admin/` to manage users, services, etc.

If you encounter any issues or have questions, feel free to reach out for assistance!
