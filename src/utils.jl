"""
    min_max(x, y; lt=isless, by=identity) = lt(by(x), by(y)) ? (x,y) : (y,x)

The same as `Base.minmax`, but supports `lt` and `by` keywords which works as those in `Base.sort`.
"""
min_max(x, y; lt=isless, by=identity) = lt(by(x), by(y)) ? (x,y) : (y,x)

"""
    varstring(N)

Returns the string of argument list "a0,a1,...,a(N-1)".
"""
varstring(N) = string("a0", [",a$k" for k in 1:N-1]...)

"""
    _filename(N,L,D)

The file that contains the infomation of constructing `swapsortN_L_D`.
"""
_filename(N,L,D) = "Sort_$(N)_$(L)_$(D).json"

"""
    keywords()

The expression `kw...` in a function definition.
"""
keywords() = Expr(:parameters, Expr(:(...), :kw))

"""
    returnvals(N)

The expression `return a1, a2, ..., a(N-1)`.
"""
function returnvals(N)
    ret = Expr(:return, Expr(:tuple))
    for k in 0:N-1
        push!(ret.args[1].args, localval(k))
    end
    ret
end

"""
    localval(i)

The `i`-th variable name `ai`.
"""
localval(i) = Symbol("a$i")

"""
    compswap(i,j)

The expression `ai, aj = min_max(ai, aj; kw...)`
"""
compswap(i,j) = Expr(:(=), Expr(:tuple, localval(i), localval(j)), Expr(:call, :min_max, keywords(), localval(i), localval(j)))

