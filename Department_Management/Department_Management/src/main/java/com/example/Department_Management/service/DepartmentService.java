package com.example.Department_Management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Department_Management.model.Department;
import com.example.Department_Management.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    // CREATE
    public Department addDepartment(Department department) {
        return repository.save(department);
    }

    // READ
    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    // UPDATE (SAFE UPDATE – NO DUPLICATE)
    public Department updateDepartment(int id, Department department) {

        Department existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        existing.setName(department.getName());
        existing.setLocation(department.getLocation());

        return repository.save(existing);
    }

    // DELETE
    public void deleteDepartment(int id) {
        repository.deleteById(id);
    }
}
