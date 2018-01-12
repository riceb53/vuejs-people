class V1::PeopleController < ApplicationController
  def index
    # get all the data for that model
    people = Person.all
    # render that info
    render json: people.as_json
  end
end
