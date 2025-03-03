var documenterSearchIndex = {"docs":
[{"location":"benchmark/#Benchmarks","page":"Benchmarks","title":"Benchmarks","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"The benchmark results are generated by the GitHub Actions. ","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"using InteractiveUtils, Pkg","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"versioninfo()\nPkg.status()","category":"page"},{"location":"benchmark/#Package-loading","page":"Benchmarks","title":"Package loading","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"The precompilation is very slow since the package reads many json files and generate sorting methods based on them. The current bottleneck is JSON.parsefile. A specialized reading method could make great improvement on precompilation speed.","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"@time include(\"../../src/SwapSort.jl\")","category":"page"},{"location":"benchmark/#Same-type-(type-stable)","page":"Benchmarks","title":"Same type (type-stable)","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"When sorting variables of the same type, swapsort has longer compilation time but from .01x to .2x runtime depending on the sorting size. ","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"using SwapSort, StaticArrays, PlotlyLight, BenchmarkTools, PlotlyDocumenter\nBenchmarkTools.DEFAULT_PARAMETERS.seconds = 0.5\nsamples = [1,2,4,8,16,32,64]\nswapsorttime = zeros(7)\nsvectortime = zeros(7)\nvectortime = zeros(7)","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"We first generate 64 random variables:","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De = rand(64)\nnothing # hide","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"Then we sort N of them, where N=164. To save the build time of the doc, this section only benchmarks N=1248163264. 3 sorting routines are benchmarked:","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"SwapSort: use SwapSort.swapsort to sort variables. Returns a sorted Tuple.\nStaticArrays: use StaticArrays.SVector to pack the variables and then sort the SVector. StaticArrays.jl has a built-in bitonic sort for the purpose. Returns a sorted SVector which has a field of sorted NTuple.\nBase: pack the variables into a Vector and use Base.sort!. Returns a sorted Vector.","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"The full benchmark can run from this script. We use @elapsed to get the first-time sort which is mostly compilation time. Then we use BenchmarkTools.@belapsed to get the actual runtime.","category":"page"},{"location":"benchmark/#Compilation","page":"Benchmarks","title":"Compilation","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"swapsorttime[1] = @elapsed swapsort(a) # hide\nswapsorttime[2] = @elapsed swapsort(a,b) # hide\nswapsorttime[3] = @elapsed swapsort(a,b,c,d) # hide\nswapsorttime[4] = @elapsed swapsort(a,b,c,d,e,f,g,h) # hide\nswapsorttime[5] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p) # hide\nswapsorttime[6] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F) # hide\nswapsorttime[7] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De) # hide\n\nsvectortime[1] = @elapsed sort(SVector(a)) # hide\n#= Do the same thing. Lines are hidden=# # hide\nsvectortime[2] = @elapsed sort(SVector(a,b)) # hide\nsvectortime[3] = @elapsed sort(SVector(a,b,c,d)) # hide\nsvectortime[4] = @elapsed sort(SVector(a,b,c,d,e,f,g,h)) # hide\nsvectortime[5] = @elapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)) # hide\nsvectortime[6] = @elapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F)) # hide\nsvectortime[7] = @elapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De)) # hide\n\nvectortime[1] = @elapsed sort!([a]) # hide\n#= Do the same thing. Lines are hidden=# # hide\nvectortime[2] = @elapsed sort!([a,b]) # hide\nvectortime[3] = @elapsed sort!([a,b,c,d]) # hide\nvectortime[4] = @elapsed sort!([a,b,c,d,e,f,g,h]) # hide\nvectortime[5] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]) # hide\nvectortime[6] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F]) # hide\nvectortime[7] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De]) # hide\n\nthisplot = plot.scatter(x=samples, y=swapsorttime, name=\"SwapSort\").scatter(x=samples,y=svectortime, name=\"StaticArrays\").scatter(x=samples,y=vectortime, name=\"Base\") # hide\nthisplot.layout.xaxis = ( # hide\n    type = \"log\", # hide\n    dtick = log10(2), # hide\n    title = \"N\" # hide\n) # hide\nthisplot.layout.yaxis = ( # hide\n    type = \"log\", # hide\n    dtick = 1, # hide\n    exponentformat = \"power\", # hide\n    title = \"Compilation\" # hide\n) # hide\nto_documenter(thisplot) # hide","category":"page"},{"location":"benchmark/#Runtime","page":"Benchmarks","title":"Runtime","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"swapsorttime[1] = @belapsed swapsort(a) # hide\nswapsorttime[2] = @belapsed swapsort(a,b) # hide\nswapsorttime[3] = @belapsed swapsort(a,b,c,d) # hide\nswapsorttime[4] = @belapsed swapsort(a,b,c,d,e,f,g,h) # hide\nswapsorttime[5] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p) # hide\nswapsorttime[6] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F) # hide\nswapsorttime[7] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De) # hide\n\nsvectortime[1] = @belapsed sort(SVector(a)) # hide\nsvectortime[2] = @belapsed sort(SVector(a,b)) # hide\nsvectortime[3] = @belapsed sort(SVector(a,b,c,d)) # hide\nsvectortime[4] = @belapsed sort(SVector(a,b,c,d,e,f,g,h)) # hide\nsvectortime[5] = @belapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)) # hide\nsvectortime[6] = @belapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F)) # hide\nsvectortime[7] = @belapsed sort(SVector(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De)) # hide\n\nvectortime[1] = @belapsed sort!([a]) # hide\nvectortime[2] = @belapsed sort!([a,b]) # hide\nvectortime[3] = @belapsed sort!([a,b,c,d]) # hide\nvectortime[4] = @belapsed sort!([a,b,c,d,e,f,g,h]) # hide\nvectortime[5] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]) # hide\nvectortime[6] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F]) # hide\nvectortime[7] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ja,Fe,Ma,Ap,My,Ju,Jl,Au,Se,Oc,No,De]) # hide\n\nthisplot = plot.scatter(x=samples, y=swapsorttime, name=\"SwapSort\").scatter(x=samples,y=svectortime, name=\"StaticArrays\").scatter(x=samples,y=vectortime, name=\"Base\") # hide\nthisplot.layout.xaxis = ( # hide\n    type = \"log\", # hide\n    dtick = log10(2), # hide\n    title = \"N\" # hide\n) # hide\nthisplot.layout.yaxis = ( # hide\n    type = \"log\", # hide\n    dtick = 1, # hide\n    exponentformat = \"power\", # hide\n    title = \"Runtime\" # hide\n) # hide\nto_documenter(thisplot) # hide","category":"page"},{"location":"benchmark/#Different-types-(type-unstable)","page":"Benchmarks","title":"Different types (type-unstable)","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"When sorting across different types, methods based on Tuple or Vararg suffer from type inference as different orders have different types. As a result, the compilation time can be a lot longer. In this benchmark, we consider up to 23 variables of different types, including","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"7 Number types: Int, Float, Irrational, Complex, Rational, BigInt, BigFloat\n8 Collection types: Tuple, Set, Dict, Matrix, Vector, sizeof, Range, NamedTuple\n8 Other types: CartesianIndex, Pair, Function, Symbol, Type, Module, Nothing, Char","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"Sorting across different types is not supported by StaticArrays.jl, so the benchmark only contains SwapSort and Base. We compare different types by sizeof.","category":"page"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"using Random, SwapSort, PlotlyLight, BenchmarkTools, StaticArrays, PlotlyDocumenter\n# default(background_color=:transparent, foreground_color=:gray, yaxis=:log, xaxis=:identity, xticks=1:23) # hide\nBenchmarkTools.DEFAULT_PARAMETERS.seconds = 0.5 # hide\na,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w = shuffle(\n    [rand(Int), rand(), π, im, 1//2, BigInt(rand(Int128)), rand(BigFloat), \n    (1,2), Set([1,2]), Dict(1=>2), rand(2,2), rand(Int, 10), randstring(), 1:10, (a=1,b=2), \n    CartesianIndex(1,2), 1=>2, sin, :sin, typeof(sin), SwapSort, nothing, 'a'])\nswapsorttime = zeros(23) # hide\nvectortime = zeros(23) # hide","category":"page"},{"location":"benchmark/#Compilation-2","page":"Benchmarks","title":"Compilation","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"swapsorttime[1] = @elapsed swapsort(a; by=sizeof) # hide\nswapsorttime[2] = @elapsed swapsort(a,b; by=sizeof) # hide\nswapsorttime[3] = @elapsed swapsort(a,b,c; by=sizeof) # hide\nswapsorttime[4] = @elapsed swapsort(a,b,c,d; by=sizeof) # hide\nswapsorttime[5] = @elapsed swapsort(a,b,c,d,e; by=sizeof) # hide\nswapsorttime[6] = @elapsed swapsort(a,b,c,d,e,f; by=sizeof) # hide\nswapsorttime[7] = @elapsed swapsort(a,b,c,d,e,f,g; by=sizeof) # hide\nswapsorttime[8] = @elapsed swapsort(a,b,c,d,e,f,g,h; by=sizeof) # hide\nswapsorttime[9] = @elapsed swapsort(a,b,c,d,e,f,g,h,i; by=sizeof) # hide\nswapsorttime[10] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j; by=sizeof) # hide\nswapsorttime[11] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k; by=sizeof) # hide\nswapsorttime[12] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l; by=sizeof) # hide\nswapsorttime[13] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m; by=sizeof) # hide\nswapsorttime[14] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n; by=sizeof) # hide\nswapsorttime[15] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o; by=sizeof) # hide\nswapsorttime[16] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p; by=sizeof) # hide\nswapsorttime[17] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q; by=sizeof) # hide\nswapsorttime[18] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r; by=sizeof) # hide\nswapsorttime[19] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s; by=sizeof) # hide\nswapsorttime[20] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t; by=sizeof) # hide\nswapsorttime[21] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u; by=sizeof) # hide\nswapsorttime[22] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v; by=sizeof) # hide\nswapsorttime[23] = @elapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w; by=sizeof) # hide\n\nvectortime[1] = @elapsed sort!([a]; by=sizeof) # hide\nvectortime[2] = @elapsed sort!([a,b]; by=sizeof) # hide\nvectortime[3] = @elapsed sort!([a,b,c]; by=sizeof) # hide\nvectortime[4] = @elapsed sort!([a,b,c,d]; by=sizeof) # hide\nvectortime[5] = @elapsed sort!([a,b,c,d,e]; by=sizeof) # hide\nvectortime[6] = @elapsed sort!([a,b,c,d,e,f]; by=sizeof) # hide\nvectortime[7] = @elapsed sort!([a,b,c,d,e,f,g]; by=sizeof) # hide\nvectortime[8] = @elapsed sort!([a,b,c,d,e,f,g,h]; by=sizeof) # hide\nvectortime[9] = @elapsed sort!([a,b,c,d,e,f,g,h,i]; by=sizeof) # hide\nvectortime[10] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j]; by=sizeof) # hide\nvectortime[11] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k]; by=sizeof) # hide\nvectortime[12] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l]; by=sizeof) # hide\nvectortime[13] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m]; by=sizeof) # hide\nvectortime[14] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n]; by=sizeof) # hide\nvectortime[15] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o]; by=sizeof) # hide\nvectortime[16] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]; by=sizeof) # hide\nvectortime[17] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q]; by=sizeof) # hide\nvectortime[18] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r]; by=sizeof) # hide\nvectortime[19] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s]; by=sizeof) # hide\nvectortime[20] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t]; by=sizeof) # hide\nvectortime[21] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u]; by=sizeof) # hide\nvectortime[22] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v]; by=sizeof) # hide\nvectortime[23] = @elapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w]; by=sizeof) # hide\n\nthisplot = plot.scatter(x=1:23, y=swapsorttime, name=\"SwapSort\").scatter(x=1:23,y=vectortime, name=\"Base\") # hide\nthisplot.layout.yaxis = ( # hide\n    type = \"log\", # hide\n    dtick = 1, # hide\n    exponentformat = \"power\", # hide\n    title = \"Compilation\" # hide\n) # hide\nthisplot.layout.xaxis = ( # hide\n    dtick = 1, # hide\n    title = \"N\" # hide\n) # hide\nto_documenter(thisplot) # hide","category":"page"},{"location":"benchmark/#Runtime-2","page":"Benchmarks","title":"Runtime","text":"","category":"section"},{"location":"benchmark/","page":"Benchmarks","title":"Benchmarks","text":"swapsorttime[1] = @belapsed swapsort(a; by=sizeof) # hide\nswapsorttime[2] = @belapsed swapsort(a,b; by=sizeof) # hide\nswapsorttime[3] = @belapsed swapsort(a,b,c; by=sizeof) # hide\nswapsorttime[4] = @belapsed swapsort(a,b,c,d; by=sizeof) # hide\nswapsorttime[5] = @belapsed swapsort(a,b,c,d,e; by=sizeof) # hide\nswapsorttime[6] = @belapsed swapsort(a,b,c,d,e,f; by=sizeof) # hide\nswapsorttime[7] = @belapsed swapsort(a,b,c,d,e,f,g; by=sizeof) # hide\nswapsorttime[8] = @belapsed swapsort(a,b,c,d,e,f,g,h; by=sizeof) # hide\nswapsorttime[9] = @belapsed swapsort(a,b,c,d,e,f,g,h,i; by=sizeof) # hide\nswapsorttime[10] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j; by=sizeof) #hide\nswapsorttime[11] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k; by=sizeof) # hide\nswapsorttime[12] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l; by=sizeof) # hide\nswapsorttime[13] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m; by=sizeof) # hide\nswapsorttime[14] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n; by=sizeof) # hide\nswapsorttime[15] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o; by=sizeof) # hide\nswapsorttime[16] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p; by=sizeof) # hide\nswapsorttime[17] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q; by=sizeof) # hide\nswapsorttime[18] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r; by=sizeof) # hide\nswapsorttime[19] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s; by=sizeof) # hide\nswapsorttime[20] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t; by=sizeof) # hide\nswapsorttime[21] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u; by=sizeof) # hide\nswapsorttime[22] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v; by=sizeof) # hide\nswapsorttime[23] = @belapsed swapsort(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w; by=sizeof) # hide\n\nvectortime[1] = @belapsed sort!([a]; by=sizeof) # hide\nvectortime[2] = @belapsed sort!([a,b]; by=sizeof) # hide\nvectortime[3] = @belapsed sort!([a,b,c]; by=sizeof) # hide\nvectortime[4] = @belapsed sort!([a,b,c,d]; by=sizeof) # hide\nvectortime[5] = @belapsed sort!([a,b,c,d,e]; by=sizeof) # hide\nvectortime[6] = @belapsed sort!([a,b,c,d,e,f]; by=sizeof) # hide\nvectortime[7] = @belapsed sort!([a,b,c,d,e,f,g]; by=sizeof) # hide\nvectortime[8] = @belapsed sort!([a,b,c,d,e,f,g,h]; by=sizeof) # hide\nvectortime[9] = @belapsed sort!([a,b,c,d,e,f,g,h,i]; by=sizeof) # hide\nvectortime[10] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j]; by=sizeof) # hide\nvectortime[11] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k]; by=sizeof) # hide\nvectortime[12] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l]; by=sizeof) # hide\nvectortime[13] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m]; by=sizeof) # hide\nvectortime[14] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n]; by=sizeof) # hide\nvectortime[15] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o]; by=sizeof) # hide\nvectortime[16] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]; by=sizeof) # hide\nvectortime[17] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q]; by=sizeof) # hide\nvectortime[18] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r]; by=sizeof) # hide\nvectortime[19] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s]; by=sizeof) # hide\nvectortime[20] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t]; by=sizeof) # hide\nvectortime[21] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u]; by=sizeof) # hide\nvectortime[22] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v]; by=sizeof) # hide\nvectortime[23] = @belapsed sort!([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w]; by=sizeof) # hide\n\nthisplot = plot.scatter(x=1:23, y=swapsorttime, name=\"SwapSort\").scatter(x=1:23,y=vectortime, name=\"Base\") # hide\nthisplot.layout.yaxis = ( # hide\n    type = \"log\", # hide\n    dtick = 1, # hide\n    exponentformat = \"power\", # hide\n    title = \"Runtime\" # hide\n) # hide\nthisplot.layout.xaxis = ( # hide\n    dtick = 1, # hide\n    title = \"N\" # hide\n) # hide\nto_documenter(thisplot) # hide","category":"page"},{"location":"#SwapSort.jl","page":"SwapSort.jl","title":"SwapSort.jl","text":"","category":"section"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"This package is intended to be a successor of SortingNetworks.jl. This package relies on the existing sorters which are currently copied from SorterHunter, a C++ project. For a visualization of the algorithms, see here.","category":"page"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"PROS\nSupports lt and by keywords.\nEasier to to add new algorithms as all codes are generated.\nSupports sorting across different types. Note that type stability will become a problem in this case.\nCONS\nVery long precompilation (~30s on CI). The current bottleneck is JSON.parsefile. The compilation is ok and the importing is fast.\nHarder to troubleshoot since the most important things are written in macros.\nDoes not support sorting a vector. The reason is that Base.sort is efficient enough for a vector.","category":"page"},{"location":"#Internals","page":"SwapSort.jl","title":"Internals","text":"","category":"section"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"There are many internal functions in the form of swapsortN_L_D(::Vararg{Any,N}). N refers to the data size, L refers to the number of comparisons/swaps. Although currently unsupported, it's possible to execute some swaps in parallel and D refers to the number of steps when computing in parallel. All available (N,L,D) triples are listed at SwapSort.SORTERS.","category":"page"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"The exported swapsort at present chooses the least available L for each N. For example, swapsort(a,b) = swapsort2_1_1(a,b). The choices are listed at SwapSort.BESTSIZE.","category":"page"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"The exported tuplesort is just another wrapper. It uses a different name as swapsort because otherwise it would be ambiguous whether the tuple is considered as one element or a group of elements. We note that TupleTools.jl uses merge sort on tuples.","category":"page"},{"location":"#Performance","page":"SwapSort.jl","title":"Performance","text":"","category":"section"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"The sorting algorithm is called sorting network. It's not the most efficient algorithm for general purpose, but in Julia, it excels at sorting a few discrete variables, as collecting/splatting is very slow.","category":"page"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"StaticArrays.jl implements BitonicSort which is a special case of sorting network. It is more flexible, but has two drawbacks:","category":"page"},{"location":"","page":"SwapSort.jl","title":"SwapSort.jl","text":"The import time of StaticArrays is 10x slower than SwapSort.\nSorting a few variables needs to pack them into a static vector. The packing in Julia is slow.","category":"page"},{"location":"docstrings/#Docstrings","page":"Docstrings","title":"Docstrings","text":"","category":"section"},{"location":"docstrings/","page":"Docstrings","title":"Docstrings","text":"Modules = [SwapSort]","category":"page"},{"location":"docstrings/#SwapSort.BESTSIZE","page":"Docstrings","title":"SwapSort.BESTSIZE","text":"const BESTSIZE = [(2, 1, 1), (3, 3, 3), (4, 5, 3), (5, 9, 5), (6, 12, 5), (7, 16, 6), (8, 19, 6), (9, 25, 7), (10, 29, 8), (11, 35, 8), (12, 39, 9), (13, 45, 10), (14, 51, 10), (15, 56, 10), (16, 60, 10), (17, 71, 12), (18, 77, 12), (19, 85, 12), (20, 91, 12), (21, 99, 15), (22, 106, 13), (23, 114, 14), (24, 120, 13), (25, 130, 15), (26, 138, 15), (27, 147, 16), (28, 155, 14), (29, 164, 15), (30, 172, 14), (31, 180, 14), (32, 185, 14), (33, 199, 15), (34, 209, 17), (35, 220, 17), (36, 227, 18), (37, 240, 17), (38, 250, 17), (39, 259, 17), (40, 265, 17), (41, 282, 18), (42, 291, 18), (43, 303, 19), (44, 309, 19), (45, 324, 19), (46, 332, 19), (47, 340, 19), (48, 346, 19), (49, 365, 21), (50, 376, 21), (51, 387, 22), (52, 395, 20), (53, 411, 22), (54, 421, 20), (55, 432, 20), (56, 438, 20), (57, 454, 21), (58, 465, 21), (59, 476, 21), (60, 483, 21), (61, 497, 22), (62, 506, 21), (63, 515, 21), (64, 521, 21)]\n\nThe list of sorters with the minimum sizes. These sorters are called by the general swapsort. See also SORTERS.\n\n\n\n\n\n","category":"constant"},{"location":"docstrings/#SwapSort.SORTERS","page":"Docstrings","title":"SwapSort.SORTERS","text":"const SORTERS = [(2, 1, 1), (3, 3, 3), (4, 5, 3), (5, 9, 5), (6, 12, 5), (7, 16, 6), (8, 19, 6), (9, 25, 7), (10, 29, 8), (10, 31, 7), (11, 35, 8), (12, 39, 9), (12, 40, 8), (13, 45, 10), (13, 46, 9), (14, 51, 10), (14, 52, 9), (15, 56, 10), (15, 57, 9), (16, 60, 10), (16, 61, 9), (17, 71, 12), (17, 72, 11), (17, 74, 10), (18, 77, 12), (18, 78, 11), (19, 85, 12), (19, 87, 11), (20, 91, 12), (20, 93, 11), (21, 99, 15), (21, 100, 12), (22, 106, 13), (22, 107, 12), (23, 114, 14), (23, 115, 13), (23, 116, 12), (24, 120, 13), (24, 122, 12), (25, 130, 15), (25, 131, 13), (26, 138, 15), (26, 139, 14), (26, 141, 13), (27, 147, 16), (27, 148, 14), (28, 155, 14), (29, 164, 15), (29, 166, 14), (30, 172, 14), (31, 180, 14), (32, 185, 14), (33, 199, 15), (34, 209, 17), (34, 210, 16), (34, 213, 15), (35, 220, 17), (35, 221, 16), (36, 227, 18), (36, 228, 17), (36, 229, 16), (37, 240, 17), (37, 243, 16), (38, 250, 17), (38, 255, 16), (39, 259, 17), (39, 263, 16), (40, 265, 17), (40, 269, 16), (41, 282, 18), (41, 283, 17), (42, 291, 18), (42, 294, 17), (43, 303, 19), (43, 305, 17), (44, 309, 19), (44, 311, 17), (45, 324, 19), (45, 325, 18), (46, 332, 19), (46, 333, 18), (47, 340, 19), (47, 341, 18), (48, 346, 19), (48, 347, 18), (49, 365, 21), (49, 369, 19), (50, 376, 21), (50, 378, 20), (50, 381, 19), (51, 387, 22), (51, 389, 20), (51, 396, 19), (52, 395, 20), (52, 407, 19), (53, 411, 22), (53, 412, 21), (53, 415, 20), (54, 421, 20), (55, 432, 20), (56, 438, 20), (57, 454, 21), (57, 461, 20), (58, 465, 21), (58, 471, 20), (59, 476, 21), (59, 480, 20), (60, 483, 21), (60, 489, 20), (61, 497, 22), (61, 498, 21), (61, 502, 20), (62, 506, 21), (62, 511, 20), (63, 515, 21), (63, 519, 20), (64, 521, 21), (64, 525, 20)]\n\nThe list of all available sorters. The algorithms can be accessed via swapsortN_L_D for (N,L,D) in SORTERS. See also BESTSIZE.\n\n\n\n\n\n","category":"constant"},{"location":"docstrings/#SwapSort._filename-Tuple{Any, Any, Any}","page":"Docstrings","title":"SwapSort._filename","text":"_filename(N,L,D)\n\nThe file that contains the infomation of constructing swapsortN_L_D.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.compswap-Tuple{Any, Any}","page":"Docstrings","title":"SwapSort.compswap","text":"compswap(i,j)\n\nThe expression ai, aj = min_max(ai, aj; kw...)\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.keywords-Tuple{}","page":"Docstrings","title":"SwapSort.keywords","text":"keywords()\n\nThe expression kw... in a function definition.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.localval-Tuple{Any}","page":"Docstrings","title":"SwapSort.localval","text":"localval(i)\n\nThe i-th variable name ai.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.min_max-Tuple{Any, Any}","page":"Docstrings","title":"SwapSort.min_max","text":"min_max(x, y; lt=isless, by=identity) = lt(by(x), by(y)) ? (x,y) : (y,x)\n\nThe same as Base.minmax, but supports lt and by keywords which works as those in Base.sort.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.returnvals-Tuple{Any}","page":"Docstrings","title":"SwapSort.returnvals","text":"returnvals(N)\n\nThe expression return a1, a2, ..., a(N-1).\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.swapsort-Tuple{Any}","page":"Docstrings","title":"SwapSort.swapsort","text":"swapsort(a...; lt=isless, by=identity)\n\nSort the arguments, returning a sorted tuple. lt and by keywords work the same as Base.sort. swapsort supports up to 64 arguments. See also tuplesort.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.tuplesort-Tuple{Tuple{Any}}","page":"Docstrings","title":"SwapSort.tuplesort","text":"tuplesort(t::Tuple; lt=isless, by=identity)\n\nReturn a sorted tuple. lt and by keywords work the same as Base.sort. tuplesort calls swapsort and supports at most 64 elements.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#SwapSort.varstring-Tuple{Any}","page":"Docstrings","title":"SwapSort.varstring","text":"varstring(N)\n\nReturns the string of argument list \"a0,a1,...,a(N-1)\".\n\n\n\n\n\n","category":"method"}]
}
