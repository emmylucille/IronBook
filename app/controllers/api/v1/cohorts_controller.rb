class API::V1::CohortsController < API::V1::BaseController
  before_action :set_cohort, only: [:show, :update, :destroy]

  def index
    @cohorts = Cohort.all
  end

  def show
    @students = Student.where(cohort_id: @cohort.id)
  end

  def create
    @cohort = Cohort.new(cohort_params)

    if @cohort.save
      render :show, status: :created
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  def update
    if @cohort.update(cohort_params)
      render :show, status: :ok
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @cohort.destroy
    render :nothing => true, :status => :no_content
  end

  private

  def set_cohort
    @cohort = Cohort.find(params[:id])
  end

  def cohort_params
    params.require(:cohort).permit(:start, :end)
  end
end
