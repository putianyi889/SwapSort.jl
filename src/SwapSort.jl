module SwapSort

using JSON, Unroll

export swapsort, tuplesort

include("consts.jl")
include("utils.jl")
include("core.jl")

"""
    swapsort(a...; lt=isless, by=identity)

Sort the arguments, returning a sorted tuple. `lt` and `by` keywords work the same as `Base.sort`. `swapsort` supports up to 64 arguments. See also [`tuplesort`](@ref).
"""
swapsort(a; kw...) = a

"""
    tuplesort(t::Tuple; lt=isless, by=identity)

Return a sorted tuple. `lt` and `by` keywords work the same as `Base.sort`. `tuplesort` calls [`swapsort`](@ref) and supports at most 64 elements.
"""
tuplesort

@unroll for para in SORTERS
    @makesorter(MAINPATH * _filename(para...))
    if para ∈ BESTSIZE
        @registersorter(para)
    end
end

end # module
