package com.alp.StudentSystem.service;

import com.alp.StudentSystem.model.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public ResponseEntity<Student> updateStudent(int id, Student student) throws Throwable;
    public ResponseEntity<Map<String, Boolean>> deleteStudent(int id) throws Throwable;
}
