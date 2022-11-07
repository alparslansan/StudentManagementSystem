package com.alp.StudentSystem.service;

import com.alp.StudentSystem.exception.ResourceNotFoundException;
import com.alp.StudentSystem.model.Student;
import com.alp.StudentSystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public ResponseEntity<Student> updateStudent(int id, Student student) throws Throwable {

        Student student1= (Student) studentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Student does not exist with id: "+id));
        student.setName(student.getName());
        student.setAddress(student.getAddress());
        Student updatedStudent= (Student) studentRepository.save(student);
        return ResponseEntity.ok(student);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteStudent(int id) throws Throwable {
        Student student= (Student) studentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Student does not exist with id: "+id));
        studentRepository.delete(student);
        Map<String, Boolean> response=new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
