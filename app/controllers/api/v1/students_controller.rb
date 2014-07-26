class API::V1::StudentsController < API::V1::BaseController
  before_action :set_student, only: [:show, :update, :destroy]

  def index
    @students = Student.all
  end

  def show
  end

  def create
    cohort = Cohort.find(params[:cohort_id])
    user = User.find(params[:user_id])
    @student = cohort.students.build(student_params)
    @student = user.build_student

    if @student.save
      render :show, status: :created
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  def update
    if @student.update(student_params)
      render :show, status: :ok
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @student.destroy
    render :nothing => true, :status => :no_content
  end

  private

  def set_student
    @student = Student.find(params[:id])
  end

  def student_params
    params.require(:student).permit(:firstname, :lastname, :bio, :github_username,
                                   :twitter_url, :linkedin_url, :avatar_uid,
                                   :cohort_class, :cohort_id, :user_id)
  end
end
