class V1::PeopleController < ApplicationController
  def index
    Prawn::Document.generate("public/hello3.pdf") do
      text "Hello World for the third time!"
    end
    # get all the data for that model
    people = Person.all
    # render that info
    redirect_to "/hello3.pdf"
    # render json: people.as_json
  end

  def create
    person = Person.new(name: params[:name], bio: params[:bio])
    if person.save
      render json: person.as_json
    else
      render json: {errors: person.errors.full_messages}, status: :bad_request
    end
  end
end
