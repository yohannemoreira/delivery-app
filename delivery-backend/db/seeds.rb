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

Rails.logger.info "Seeding orders..."
Order.destroy_all
users = User.all

users.each do |user|
    2.times do
        Order.create(
            user: user,
            pickup_address_street: Faker::Address.street_name,
            pickup_address_number: Faker::Address.building_number,
            pickup_address_complement: Faker::Address.secondary_address,
            pickup_address_neighborhood: Faker::Address.community,
            pickup_address_city: Faker::Address.city,
            pickup_address_state: Faker::Address.state_abbr,
            pickup_address_zip: Faker::Address.zip_code,
            pickup_address_country: Faker::Address.country,
            delivery_address_street: Faker::Address.street_name,
            delivery_address_number: Faker::Address.building_number,
            delivery_address_complement: Faker::Address.secondary_address,
            delivery_address_neighborhood: Faker::Address.community,
            delivery_address_city: Faker::Address.city,
            delivery_address_state: Faker::Address.state_abbr,
            delivery_address_zip: Faker::Address.zip_code,
            delivery_address_country: Faker::Address.country,
            description: Faker::Lorem.sentence,
            estimated_value: Faker::Commerce.price
        )
    end
end

Rails.logger.info "Orders seeded successfully."
Rails.logger.info "Seeding completed successfully."
