package org.example.ims_backend.repository.specification;

import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> hasKeyword(String keyword) {
        return (root, query, builder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return builder.conjunction();
            }
            String likePattern = "%" + keyword.toLowerCase() + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("fullName")), likePattern),
                    builder.like(builder.lower(root.get("username")), likePattern),
                    builder.like(builder.lower(root.get("email")), likePattern),
                    builder.like(builder.lower(root.get("phone")), likePattern),
                    builder.like(builder.lower(root.get("homeTown")), likePattern));
        };
    }
}
