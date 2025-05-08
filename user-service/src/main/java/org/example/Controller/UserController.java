//package org.example.Controller;
//
//import org.example.Model.User;
//import org.example.Service.UserService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    @Autowired
//    private UserService service;
//
//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        return service.register(user);
//    }
//
//    @GetMapping
//    public List<User> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/{id}")
//    public User getById(@PathVariable String id) {
//        return service.getById(id);
//    }
//}
//
package org.example.Controller;

import org.example.DTO.UserProfileDTO;
import org.example.DTO.userRes;
import org.example.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<userRes> signup(@Valid @RequestBody userRes userRes){
        return ResponseEntity.ok(userService.signup(userRes));
    }
    @PostMapping("/signin")
    public ResponseEntity<userRes> signin(@Valid @RequestBody userRes userRes){
        return ResponseEntity.ok(userService.signin(userRes));
    }
    @PostMapping("/register")
    public ResponseEntity<UserProfileDTO> register(@Valid @RequestBody UserProfileDTO dto) {
        UserProfileDTO created = userService.register(dto);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> update(
            @PathVariable String id,
            @Valid @RequestBody UserProfileDTO dto) {
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserProfileDTO>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}