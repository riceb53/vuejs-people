class V1::PeopleController < ApplicationController
  def index
    # get all the data for that model
    people = Person.all
    # render that info
    render json: people.as_json
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
