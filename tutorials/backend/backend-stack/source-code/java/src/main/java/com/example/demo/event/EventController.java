package com.example.demo.event;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

record UserTable(String id, String name) {
}

@RestController
public class EventController {
    @PostMapping("/event")
    public ResponseEntity newUserHandler(RequestEntity<EventPayload<UserTable, Optional<UserTable>>> request) {
        return ResponseEntity.ok().build();
    }
}
