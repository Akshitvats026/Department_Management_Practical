package com.example.Department_Management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Department_Management.model.Department;

public interface DepartmentRepository
        extends JpaRepository<Department, Integer> {
}
