 <div class="row">
                        <div class="col-lg-7 col-xlg-7 col-md-12">
                            <div class="card-body">
                                @if(session('success'))
                                    <div class="alert alert-success alert-dismissible">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                        <h4><i class="icon fa fa-check"></i> Thông báo!</h4>
                                        {{session('success')}}
                                    </div>
                                @endif
                               <!--  @if($errors->any())
                                    <div class="alert alert-danger alert-dismissible">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                        <h4><i class="icon fa fa-check"></i> Thông báo!</h4>
                                        <ul>
                                            @foreach($errors->all() as $error)
                                                <li>{{$error}}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif -->
                                <form class="form-horizontal form-material" enctype="multipart/form-data" method="POST">
                                    @csrf
                                    <!--  -->
                                    <div class="form-group">
                                        <label class="col-md-12">Title <span style="color: red">(*)</span></label>
                                        <div class="col-md-12">
                                            <input  type="text" placeholder="" class="form-control form-control-line" name="title" id="title"  value="" >
                                        </div>
                                    </div>
                                  	
                                  	 <div class="form-group">
                                        <label class="col-md-12">Descriptiontle <span style="color: red">(*)</span></label>
                                        <div class="col-md-12">
                                            <input  type="text" placeholder="" class="form-control form-control-line" name="description" id="description"  value="" >
                                        </div>
                                    </div>

                                    
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <button type="submit" class="btn btn-success">Create Blog</button>
                                        </div>
                                    </div>
                                    <!--  -->
                                </form>
                            </div>
                        </div>
                    </div>