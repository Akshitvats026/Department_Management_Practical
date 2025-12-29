package com.example.Department_Management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Department_Management.model.Department;
import com.example.Department_Management.service.DepartmentService;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService service;

    // POST /departments
    @PostMapping
    public Department addDepartment(@RequestBody Department department) {
        return service.addDepartment(department);
    }

    // GET /departments
    @GetMapping
    public List<Department> getDepartments() {
        return service.getAllDepartments();
    }

    // PUT /departments/{id}
    @PutMapping("/{id}")
    public Department updateDepartment(
            @PathVariable int id,
            @RequestBody Department department) {
        return service.updateDepartment(id, department);
    }

    // DELETE /departments/{id}
    @DeleteMapping("/{id}")
    public String deleteDepartment(@PathVariable int id) {
        service.deleteDepartment(id);
        return "Department deleted successfully";
    }
}
