package org.example.DTO;

public class userRes {
     private String id;
     private String email;
     private String name;
     private String password;

     // Constructor (email, name, id)
     public userRes(String email, String name, String id) {
          this.email = email;
          this.name = name;
          this.id = id;
     }

     // Default constructor
     public userRes() {}

     // Getters and setters
     public String getId() { return id; }

     public void setId(String id) { this.id = id; }

     public String getEmail() { return email; }

     public void setEmail(String email) { this.email = email; }

     public String getName() { return name; }

     public void setName(String name) { this.name = name; }

     public String getPassword() { return password; }

     public void setPassword(String password) { this.password = password; }
}
