Rails.logger.info "Seeding users..."

User.destroy_all

10.times do
    name = Faker::Name.name
    email = Faker::Internet.email(name: name)
    password = Faker::Internet.password(min_length: 8)

    User.create(
        name: name,
        email: email,
        password: password,
        password_confirmation: password
    )
end

Rails.logger.info "Users seeded successfully."
