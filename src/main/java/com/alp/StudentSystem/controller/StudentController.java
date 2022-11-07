package com.alp.StudentSystem.controller;

import com.alp.StudentSystem.model.Student;
import com.alp.StudentSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    // SAVE
    // http://localhost:8080/student/add
    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent(student);
        return "New student is added";
    }

    // LIST
    // http://localhost:8080/student/getAll
    @GetMapping("/getAll")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    // UPDATE
    // http://localhost:8080/student/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) throws Throwable {
        studentService.updateStudent(id, student);
        return ResponseEntity.ok(student);
    }

    // DELETE
    // http://localhost:8080/student/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteStudent(@PathVariable int id) throws Throwable {
        studentService.deleteStudent(id);
        Map<String,Boolean> response=new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
