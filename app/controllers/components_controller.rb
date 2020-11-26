class ComponentsController < ApplicationController
  before_action :get_meal
  before_action :set_component, only: [:show, :edit, :update, :destroy]

  # GET /components
  # GET /components.json
  def index
    @components = @meal.components
  end

  # GET /components/1
  # GET /components/1.json
  def show
  end

  # GET /components/new
  def new
    @component = @meal.components.build
  end

  # GET /components/1/edit
  def edit
  end

  # POST /components
  # POST /components.json
  def create
    @component = @meal.components.create(component_params)

    respond_to do |format|
      if @component.save
        format.html { redirect_to meal_components_path(@meal), notice: 'Component was successfully created.' }
        format.json { render :show, status: :created, location: @meal }
      else
        format.html { render :new }
        format.json { render json: @component.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /components/1
  # PATCH/PUT /components/1.json
  def update
    respond_to do |format|
      if @component.update(component_params)
        format.html { redirect_to meal_component_path(@meal), notice: 'Component was successfully updated.' }
        format.json { render :show, status: :ok, location: @meal }
      else
        format.html { render :edit }
        format.json { render json: @component.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /components/1
  # DELETE /components/1.json
  def destroy
    @component.destroy
    respond_to do |format|
      format.html { redirect_to meal_components_path(@meal), notice: 'Component was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def get_meal
      @meal = Meal.find(params[:meal_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_component
      @component = @meal.components.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def component_params
      params.require(:component).permit(:name, :quantity, :measure, :food_id, :meal_id)
    end
    
end
